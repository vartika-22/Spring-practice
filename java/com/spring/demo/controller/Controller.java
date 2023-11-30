package com.spring.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.demo.model.Employee;
import com.spring.demo.service.EmployeeService;

@RestController
public class Controller {
	
	@Autowired
	private EmployeeService employeeService;
	
	
	@GetMapping("/employee")
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployee();
	}

	@GetMapping("employee/{id}")
	public Employee getEmployeeById(@PathVariable Long id) {
		return employeeService.getAllEmployeeById(id);
	}
	@PostMapping("/employee")
	public Employee saveEmployee(@RequestBody Employee employee) {
		return employeeService.saveEmployee(employee);
	}
	
	@DeleteMapping("/employee")
	public String deleteEmployee(@PathVariable Long id) {
		employeeService.deleteEmployee(id);
		return "deleted Successfully";
	}
}
