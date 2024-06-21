package com.team.service;

import com.team.dto.AppointmentDTO;
import com.team.dto.AppointmentRequestDTO;
import com.team.model.*;
import com.team.repository.*;
import lombok.Getter;
import lombok.Setter;
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

    public AppointmentService(AppointmentRepository appointmentRepository, EmployeeRepository employeeRepository, CustomerRepository customerRepository, PetRepository petRepository, ServiceRepository serviceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
        this.petRepository = petRepository;
        this.serviceRepository = serviceRepository;
    }


    // this function return not available slots of the next 3 days. Don't include the day when the customer in the website
    public List<AppointmentDTO> getAllAppointments(LocalDateTime timeSendRequest) {
        try {
            // timeSendRequest = LocalDateTime.parse("2024-06-05 09:00:00", formatter);
            // set a range to take the list appointment
            LocalTime time = timeSendRequest.toLocalTime();
            LocalTime lastShift = LocalTime.parse("17:00:00");
            LocalDateTime min = timeSendRequest.plusDays(1);
            LocalDateTime max = timeSendRequest.plusDays(4);
            String after = min.format(FORMATTER);
            if (time.isAfter(lastShift)) {
                max = timeSendRequest.plusDays(5);
            }
            String before = max.format(FORMATTER_DATE);

            List<Object[]> listAppointments = appointmentRepository.findAppointmentsAfterBefore(after, before);

            // convert into appointmentDTO type
            List<AppointmentDTO> result = new ArrayList<>();
            for (Object row[] : listAppointments) {
                String appointmentTime = ((Timestamp) row[0]).toString().replace(".0", "");
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
            appointments.setDepositAmount(totalMoney);
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


}
