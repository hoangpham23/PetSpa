package com.team.service;

import com.team.dto.*;
import com.team.model.*;
import com.team.repository.AccountRepository;
import com.team.repository.AppointmentRepository;
import com.team.repository.EmployeeRepository;
import com.team.repository.EmployeeScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
public class EmployeeService {


    private final EmployeeRepository employeeRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final EmployeeScheduleRepository employeeScheduleRepository;
    private final AppointmentRepository appointmentRepository;

    public EmployeeService(EmployeeRepository employeeRepository, AccountRepository accountRepository, AccountService accountService, EmployeeScheduleRepository employeeScheduleRepository, AppointmentRepository appointmentRepository) {
        this.employeeRepository = employeeRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.employeeScheduleRepository = employeeScheduleRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<EmployeeDTO> showAllEmployees() {
        List<Employees> employeesList = employeeRepository.findAllByStatus("ACTIVE");
        List<EmployeeDTO> result = new ArrayList<>();
        for (Employees employee : employeesList) {
            Accounts accounts = accountRepository.findById(employee.getId()).get();
            EmployeeDTO dto = new EmployeeDTO();
            dto.setEmployeeID(employee.getId());
            dto.setEmployeeName(employee.getEmployeeName());
            dto.setEmail(employee.getEmail());
            dto.setPassword(accounts.getPassword());
            dto.setPhoneNumber(employee.getPhoneNumber());
            dto.setEmployeeCIN(employee.getEmployeeCIN());
            dto.setGender(employee.getGender());
            result.add(dto);
        }

        return result;
    }

    public Employees deleteEmployee(Integer employeeID) {
        Optional<Employees> employeeOptional = employeeRepository.findById(employeeID);
        if (employeeOptional.isPresent()) {
            Employees employee = employeeOptional.get();
            employee.setStatus("INACTIVE");
            return employeeRepository.save(employee);
        }

        return null;
    }

    public Map<String, String> createEmployee(Map<String, String> data) {
        String name = data.get("name");
        String phoneNumber = data.get("phoneNumber");
        String email = data.get("email");
        String employeeCIN = data.get("employeeCIN");
        String gender = data.get("gender");
        String defaultPassword = "1234";
        String role = "EM";
        Map<String, String> error = new HashMap<>();
        boolean alreadyExists = false;

        if (employeeRepository.existsByEmail(email)){
            error.put("errorEmail", "Email Already Exists");
            alreadyExists = true;
        }
        if (employeeRepository.existsByPhoneNumber(phoneNumber)){
            error.put("errorPhoneNumber", "Phone Number Already Exists");
            alreadyExists = true;
        }
        if (employeeRepository.existsByEmployeeCIN(employeeCIN)){
            error.put("errorEmployeeCIN", "Employee CIN Already Exists");
            alreadyExists = true;
        }
        if (alreadyExists) {
            return error;
        }
        Accounts accounts = accountService.createAccount(email, defaultPassword, role);
        Employees employees = new Employees();
        employees.setId(accounts.getAccountID());
        employees.setEmployeeName(name);
        employees.setEmail(email);
        employees.setPhoneNumber(phoneNumber);
        employees.setEmployeeCIN(employeeCIN);
        employees.setGender(gender);
        employees.setStatus("ACTIVE");

        return null;
    }

    public List<WorkDateDTO> getSchedule(int employeeID, LocalDate requestTime) {
        if (requestTime == null) {
            requestTime = LocalDate.now();
        }
        LocalDate startDate = requestTime.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        // Compute the end date (Sunday of the current week)
        LocalDate endDate = startDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        Employees employees = employeeRepository.findById(employeeID).get();
        // retrieve schedule date for a week from Monday to Sunday
        List<EmployeeSchedule> data = employeeScheduleRepository.findAllByEmployeesAndWorkDateBetweenOrderByWorkDateAscStartTimeAsc(employees, startDate, endDate);
        if (data.isEmpty()) {
            return null;
        }
        List<WorkDateDTO> result = new ArrayList<>();
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        LocalDate saveDate = null;

        for (EmployeeSchedule schedule : data) {
            LocalDate workDate = schedule.getWorkDate();
            LocalTime startTime = schedule.getStartTime();
            LocalTime endTime = schedule.getEndTime();
            String customerName = schedule.getAppointments().getCustomer().getCustomerName();
            String serviceName = schedule.getAppointments().getServices().getServiceName();

            if (saveDate == null) {
                saveDate = workDate;
            }

            if (!workDate.isEqual(saveDate)) {
                result.add(new WorkDateDTO(saveDate, new ArrayList<>(scheduleDTOList)));
                scheduleDTOList.clear();
                saveDate = workDate;
            }

            scheduleDTOList.add(new ScheduleDTO(startTime, endTime, serviceName, customerName));
        }

        result.add(new WorkDateDTO(saveDate, new ArrayList<>(scheduleDTOList)));
        return result;
    }

    public void assignSchedule(String appointmentID) {
        StringTokenizer tokenizer = new StringTokenizer(appointmentID, ",");
        while (tokenizer.hasMoreTokens()) {
            Appointments appointment = appointmentRepository.findById(Integer.parseInt(tokenizer.nextToken())).get();
            appointment.setStatus("Schedule");
            Employees employees = appointment.getEmployees();
            EmployeeSchedule employeeSchedule = new EmployeeSchedule();
            employeeSchedule.setEmployees(employees);
            employeeSchedule.setAppointments(appointment);
            employeeSchedule.setWorkDate(appointment.getAppointmentTime().toLocalDateTime().toLocalDate());
            LocalTime startTime = appointment.getAppointmentTime().toLocalDateTime().toLocalTime();
            LocalTime endTime = appointment.getAppointmentTime().toLocalDateTime().toLocalTime().plusHours(1);
            employeeSchedule.setStartTime(startTime);
            employeeSchedule.setEndTime(endTime);
            employeeScheduleRepository.save(employeeSchedule);
            appointmentRepository.save(appointment);
        }
    }

    public EmployeeResponseDTO getEmployee(AccountDTO accounts) {
        Employees employees = employeeRepository.findById(accounts.getAccountID()).get();
        if ("ACTIVE".equals(employees.getStatus())) {
            EmployeeResponseDTO dto = new EmployeeResponseDTO();
            dto.setEmployeeID(employees.getId());
            dto.setEmployeeName(employees.getEmployeeName());
            dto.setPhoneNumber(employees.getPhoneNumber());
            dto.setToken(accounts.getToken());
            return dto;
        }
        return null;
    }

    public Map<String, String> updateEmployee(EmployeeDTO employeeDTO) {
        Map<String, String> errors = new HashMap<>();
        Employees employee;
        Accounts accounts;

        try {
            employee = employeeRepository.findById(employeeDTO.getEmployeeID())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id " + employeeDTO.getEmployeeID()));
            accounts = accountRepository.findById(employeeDTO.getEmployeeID())
                    .orElseThrow(() -> new RuntimeException("Account not found for employee with id " + employeeDTO.getEmployeeID()));
        } catch (RuntimeException e) {
            errors.put("notFound", e.getMessage());
            return errors;
        }

        if (employeeDTO.getPhoneNumber() != null && !employeeDTO.getPhoneNumber().equals(employee.getPhoneNumber())) {
            if (employeeRepository.existsByPhoneNumber(employeeDTO.getPhoneNumber())) {
                errors.put("phoneNumber", "Phone number already exists");
            }
        }

        if (employeeDTO.getEmail() != null && !employeeDTO.getEmail().equals(employee.getEmail())) {
            if (employeeRepository.existsByEmail(employeeDTO.getEmail())) {
                errors.put("email", "Email already exists");
            }
        }

        if (employeeDTO.getEmployeeCIN() != null && !employeeDTO.getEmployeeCIN().equals(employee.getEmployeeCIN())){
            if (employeeRepository.existsByEmployeeCIN(employeeDTO.getEmployeeCIN())){
                errors.put("employeeCIN", "EmployeeCIN already exists");
            }
        }


        if (!errors.isEmpty()) {
            return errors;
        }

        // If no errors, proceed with the update
        if (employeeDTO.getEmployeeName() != null) {
            employee.setEmployeeName(employeeDTO.getEmployeeName());
        }
        if (employeeDTO.getPhoneNumber() != null) {
            employee.setPhoneNumber(employeeDTO.getPhoneNumber());
        }
        if (employeeDTO.getEmail() != null) {
            employee.setEmail(employeeDTO.getEmail());
        }
        if (employeeDTO.getPassword() != null) {
            accounts.setPassword(employeeDTO.getPassword());
        }

        employeeRepository.save(employee);
        accountRepository.save(accounts);

        return errors; // Will be empty if update was successful
    }

}
