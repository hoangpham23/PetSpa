package com.team.service;

import com.team.dto.AppointmentDTO;
import com.team.dto.AppointmentRequestDTO;
import com.team.dto.ManageAppointmentDTO;
import com.team.dto.RescheduleDTO;
import com.team.model.*;
import com.team.repository.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final EmployeeScheduleRepository employeeScheduleRepository;
    @Setter
    @Getter
    private int AVAILABLE_SLOT = 4;
    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final static DateTimeFormatter FORMATTER_DATE = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final AppointmentRepository appointmentRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;
    private final PetRepository petRepository;
    private final ServiceRepository serviceRepository;
    private final FeedbackRepository feedbackRepository;


    // this function return not available slots of the next 3 days. Don't include the day when the customer in the website
    public List<AppointmentDTO> getAllAppointments(LocalDateTime timeSendRequest) {
        try {
            // timeSendRequest = LocalDateTime.parse("2024-06-05 09:00:00", formatter);
            // set a range to take the list appointment
            LocalDateTime min = timeSendRequest.plusHours(2);
            LocalDateTime max = timeSendRequest.plusDays(4);
            String after = min.format(FORMATTER);
            String before = max.format(FORMATTER_DATE);

            List<Object[]> listAppointments = appointmentRepository.findAppointmentsAfterBefore(after, before);

            // convert into appointmentDTO type
            List<AppointmentDTO> result = new ArrayList<>();
            for (Object row[] : listAppointments) {
                String appointmentTime = ((Timestamp) row[0]).toString().replace(".0", "");
                Integer count = (Integer) row[1];
                // return unavailable appointment
                if (count >= getMaxBooking()) {
                    result.add(new AppointmentDTO(appointmentTime, count));
                }
            }

            return result;
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }

    }

    public List<Appointments> createAppointment(AppointmentRequestDTO data) {
        Integer customerID = data.getCustomerID();
        List<Integer> listServicesID = data.getServiceIds();
        Integer petID = data.getPetID();
        List<String> listAppointmentTime = data.getAppointmentTimes();
        List<Appointments> result = new ArrayList<>();
        double totalMoney = data.getDepositAmount();
        int count = listServicesID.size();
        int index = 0;

        while (count != 0) {
            // receive data from the database
            String time = listAppointmentTime.get(index).replace(".000", "");
            LocalDateTime appointmentTime = LocalDateTime.parse(time, FORMATTER);
            Integer employeeID = findLastEmployee(appointmentTime);
            // null only the slot is full

            Customers customers = customerRepository.findById(customerID).get();
            Pets pets = petRepository.findById(petID).get();
            Services services = serviceRepository.findById(listServicesID.get(index)).get();
            Employees employees = employeeRepository.findById(employeeID).get();

            // set data into a new appointment
            Appointments appointments = new Appointments();
            appointments.setAppointmentTime(Timestamp.valueOf(listAppointmentTime.get(index)));
            appointments.setEmployees(employees);
            appointments.setCustomer(customers);
            appointments.setPets(pets);
            appointments.setServices(services);
            appointments.setPaymentStatus("Pending");
            appointments.setStatus("Not assign");
            Appointments savedAppointments = appointmentRepository.save(appointments);
            result.add(savedAppointments);

            count--;
            index++;
        }
        return result;
    }

    private Integer findLastEmployee(LocalDateTime request) {
        try {
            // find the last employee is assigned to the last appointment in a day
            Optional<Integer> data = appointmentRepository.findLastEmployeeIDInADay(FORMATTER_DATE.format(request));
            int employeeID = data.orElseGet(() -> appointmentRepository.findLastEmployeeID().get());

            // find all the employee are assign the that shift
            List<Integer> listData = appointmentRepository.findAllEmployeeInOneShift(request);


            do {
                employeeID = getNextEmployeeID(employeeID);
            } while (listData.contains(employeeID));

            return employeeID;
        } catch (Exception e) {
            log.error("error at find last employee: {}", e.getMessage());
            return null;
        }
    }

    private int getNextEmployeeID(int employeeID) {
        Employees employees = employeeRepository.findById(employeeID).get();
        List<Employees> employeesList = employeeRepository.findAllByStatus("ACTIVE");
        int index = employeesList.indexOf(employees);
        if (index == employeesList.size() - 1) {
            return employeesList.getFirst().getId();
        }

        return employeesList.get(index + 1).getId();
    }


    public List<ManageAppointmentDTO> getAppointmentsForDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        List<Appointments> appointments = appointmentRepository.findAppointmentsForDate(startOfDay, endOfDay);

        List<ManageAppointmentDTO> result = appointments.stream().map(appointment -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            String formattedDateTime = appointment.getAppointmentTime().toLocalDateTime().format(formatter);
            ManageAppointmentDTO dto = new ManageAppointmentDTO();
            dto.setAppointmentID(appointment.getAppointmentID());
            dto.setAppointmentTime(formattedDateTime);
            dto.setServiceName(appointment.getServices().getServiceName());
            dto.setCustomerName(appointment.getCustomer().getCustomerName());
            dto.setCustomerEmail(appointment.getCustomer().getEmail());
            dto.setCustomerPhoneNumber(appointment.getCustomer().getPhoneNumber());
            dto.setPetName(appointment.getPets().getPetName());
            dto.setStatus(appointment.getStatus());
            return dto;
        }).sorted(Comparator.comparing(ManageAppointmentDTO::getAppointmentTime)).collect(Collectors.toList());

        return result;
    }
    public List<ManageAppointmentDTO> getAppointmentsByPhoneNumberAndDate(String phoneNumber, LocalDate date) {
        String formattedDate = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<Appointments> appointments = appointmentRepository.findAppointmentsByPhoneNumberAndDate(phoneNumber, formattedDate);

        List<ManageAppointmentDTO> result = appointments.stream().map(appointment -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            String formattedDateTime = appointment.getAppointmentTime().toLocalDateTime().format(formatter);
            ManageAppointmentDTO dto = new ManageAppointmentDTO();
            dto.setAppointmentID(appointment.getAppointmentID());
            dto.setAppointmentTime(formattedDateTime);
            dto.setServiceName(appointment.getServices().getServiceName());
            dto.setCustomerName(appointment.getCustomer().getCustomerName());
            dto.setCustomerEmail(appointment.getCustomer().getEmail());
            dto.setCustomerPhoneNumber(appointment.getCustomer().getPhoneNumber());
            dto.setPetName(appointment.getPets().getPetName());
            dto.setStatus(appointment.getStatus());
            return dto;
        }).sorted(Comparator.comparing(ManageAppointmentDTO::getAppointmentTime)).collect(Collectors.toList());

        return result;
    }

    public boolean updateAppointmentStatus(int appointmentID, String status) {
        Optional<Appointments> appointmentOpt = appointmentRepository.findById(appointmentID);
        if (appointmentOpt.isPresent()) {
            Appointments appointment = appointmentOpt.get();
            appointment.setStatus(status);
            appointmentRepository.save(appointment);

            if ("Completed".equals(status)) {
                Feedback feedback = new Feedback();
                feedback.setAppointmentID(appointment);
                feedback.setCustomerID(appointment.getCustomer());
                feedback.setEmployeeID(appointment.getEmployees());
                feedback.setServiceID(appointment.getServices());
                feedback.setStatus("Have not feedback");
                feedbackRepository.save(feedback);
            }

            return true;
        } else {
            return false;
        }
    }


    public void rescheduleAppointment(RescheduleDTO request) throws Exception {
        int index = 0;
        List<Integer> listAppointmentID = request.getAppointmentID();
        List<String> listAppointmentTime = request.getAppointmentTime();
        while(index < request.getAppointmentID().size()){
            Integer appointmentID = request.getAppointmentID().get(index);
            String appointmentTime = request.getAppointmentTime().get(index);
            Appointments appointments = appointmentRepository.findById(appointmentID)
                    .orElseThrow(() -> new Exception("Appointment not found"));
            Employees employees = employeeRepository.findById(appointments.getEmployees().getId())
                    .orElseThrow(() -> new Exception("Employee not found"));

            EmployeeSchedule employeeSchedule = employeeScheduleRepository.findByAppointments(appointments);
            String[] time = appointmentTime.split(" ");
            LocalDate workDate = LocalDate.parse(time[0], FORMATTER_DATE);
            LocalTime startTime = LocalTime.parse(time[1]);
            boolean checkEmployeeFree = employeeScheduleRepository.existsByEmployeesIDAndWorkDateAndStartTime(employees.getId(), workDate, startTime);

            appointments.setStatus("Rescheduled");
            appointments.setAppointmentTime(Timestamp.valueOf(appointmentTime));
            int employeeID = employees.getId();
            if (!checkEmployeeFree) {
                employeeID = findLastEmployee(LocalDateTime.parse(appointmentTime.replace(".000", ""), FORMATTER));
            }
            appointments.setEmployees(employeeRepository.findById(employeeID).get());
            employeeSchedule.setEmployees(employeeRepository.findById(employeeID).get());
            employeeSchedule.setWorkDate(workDate);
            employeeSchedule.setStartTime(startTime);
            employeeSchedule.setEndTime(startTime.plusHours(1));
            employeeSchedule.setAppointments(appointments);
            appointmentRepository.save(appointments);
            employeeScheduleRepository.save(employeeSchedule);
            index++;
        }

    }


    public void updateMaxBookings(int maxBooking){
        serviceRepository.updateMaxSlotsForAllServices(maxBooking);
    }

    public int getMaxBooking(){
        return serviceRepository.findAllByStatus("ACTIVE").getFirst().getMaxSlots();
    }

}
