package com.team.service;

import com.team.dto.AppointmentDTO;
import com.team.model.*;
import com.team.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
public class AppointmentService {

    private final static int AVAILABLE_SLOT = 4;
    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final static DateTimeFormatter FORMATTER_DATE = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final AppointmentRepository appointmentRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;
    private final PetRepository petRepository;
    private final ServiceRepository serviceRepository;
    private final EmployeeScheduleRepository employeeScheduleRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, EmployeeRepository employeeRepository, CustomerRepository customerRepository, PetRepository petRepository, ServiceRepository serviceRepository, EmployeeScheduleRepository employeeScheduleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
        this.employeeScheduleRepository = employeeScheduleRepository;
    }

    // this function return not available slots of the next 3 days. Don't include the day when the customer in the website
    public List<AppointmentDTO> getAllAppointments(LocalDateTime timeSendRequest) {
        try {
            // timeSendRequest = LocalDateTime.parse("2024-06-05 09:00:00", formatter);
            // set a range to take the list appointment
            LocalDateTime min = timeSendRequest.plusDays(1);
            LocalDateTime max = timeSendRequest.plusDays(4);
            String after = min.format(FORMATTER);
            String before = max.format(FORMATTER_DATE);

            List<Object[]> listAppointments = appointmentRepository.findAppointmentsAfterBefore(after, before);

            // convert into appointmentDTO type
            List<AppointmentDTO> result = new ArrayList<>();
            for (Object row[] : listAppointments) {
                LocalDateTime appointmentTime = ((Timestamp) row[0]).toLocalDateTime();
                Integer count = (Integer) row[1];
                // return unavailable appointment
                if (count == AVAILABLE_SLOT) {
                    result.add(new AppointmentDTO(appointmentTime, count));
                }
            }

            return result;
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }

    }

    // customerID, serviceID, appointmentTime, TotalMoney, PetId
    public Appointments createAppointment(Map<String, String> data) {
        try {
            // receive data from the request
            Integer customerID = Integer.parseInt(data.get("customerID"));
            Integer serviceID =Integer.parseInt(data.get("serviceID"));
            Integer petID = Integer.parseInt(data.get("petID"));
            String time  = data.get("appointmentTime").replace(".000", "");
            LocalDateTime appointmentTime = LocalDateTime.parse(time, FORMATTER);

            // receive data from the database
            Integer employeeID = findLastEmployee(appointmentTime);
            if (employeeID == null) {
                return null;
            }
            Customers customers = customerRepository.findById(customerID).get();
            Pets pets = petRepository.findById(petID).get();
            Services services = serviceRepository.findById(serviceID).get();
            Employees employees = employeeRepository.findById(employeeID).get();

            // set data into a new appointment
            Appointments appointments = new Appointments();
            appointments.setAppointmentTime(Timestamp.valueOf(appointmentTime));
            appointments.setEmployees(employees);
            appointments.setCustomer(customers);
            appointments.setPets(pets);
            appointments.setServices(services);

            Appointments savedAppointments = appointmentRepository.save(appointments);
            EmployeeSchedule employeeSchedule = new EmployeeSchedule();
            employeeSchedule.setEmployeeID(employees);
            employeeSchedule.setAppointmentID(savedAppointments);
            employeeSchedule.setWorkDate(savedAppointments.getAppointmentTime().toLocalDateTime().toLocalDate());
            LocalTime startTime = savedAppointments.getAppointmentTime().toLocalDateTime().toLocalTime();
            LocalTime endTime = savedAppointments.getAppointmentTime().toLocalDateTime().toLocalTime().plusHours(1);
            employeeSchedule.setStartTime(startTime);
            employeeSchedule.setEndTime(endTime);
            employeeScheduleRepository.save(employeeSchedule);

            return savedAppointments;
        } catch (Exception e) {
            log.error("create appointment function: {}", e.getMessage());
            return null;
        }
    }

    private Integer findLastEmployee(LocalDateTime request) {
        try {
            // find the last employee is assigned to the last appointment in a day
            Optional<Integer> data = appointmentRepository.findLastEmployeeIDInADay(FORMATTER_DATE.format(request));
            int employeeID = data.orElseGet(() -> appointmentRepository.findLastEmployeeID().get());

            // find all the employee are assign the that shift
            List<Integer> listData = appointmentRepository.findAllEmployeeInOneShift(request);

            if (listData.size() == AVAILABLE_SLOT) {
                return null;
            }

            do {
                employeeID = getNextEmployeeID(employeeID);
            } while (listData.contains(employeeID));

            return employeeID;
        } catch (Exception e) {
            log.error("error at find last employee: {}", e.getMessage());
            return null;
        }
    }

    private int getNextEmployeeID(int employeeID){
        Employees employees = employeeRepository.findById(employeeID).get();
        List<Employees> employeesList = employeeRepository.findAll();
        int index = employeesList.indexOf(employees);
        if (index == employeesList.size() - 1) {
            return employeesList.getFirst().getId();
        }

        return employeesList.get(index + 1).getId();
    }


}
