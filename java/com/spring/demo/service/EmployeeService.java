package com.spring.demo.service;

import java.util.List;

import com.spring.demo.model.Employee;

public interface EmployeeService {

	List<Employee> getAllEmployee();
	Employee getAllEmployeeById(Long id);
	Employee saveEmployee(Employee employee);
	String deleteEmployee(Long id);
	
}
