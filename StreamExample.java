package practice;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {

	public static void main(String[] args) {

		List<Integer> number = Arrays.asList(2, 3, 4, 12, 3, 5, 74, 2, 4, 12, 54, 52);

		//item greater than 5
		List<Integer> greaterThan5 = number.stream().filter(i -> i > 5).collect(Collectors.toList());

		System.out.println(number);
		System.out.println("Greator Than 5 -> " + greaterThan5);

		//sum of all items
		int sumOfEven = number.stream().filter(i -> i % 2 == 0).reduce(0, Integer::sum);
		System.out.println("Sum of even -> " + sumOfEven);
		
		//reverse a list without sorted
		List<Integer> reverseList=number.stream().collect(Collectors.collectingAndThen(Collectors.toList(), 
				newlist->{Collections.reverse(newlist); return newlist;}));
		System.out.println("Reversed List -> "+reverseList);
		
		//reverse list in a sorted order
		List<Integer> reverseSortedList=number.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
		System.out.println("Reversed Sorted List -> "+reverseSortedList);
		
		//distinct square of a list
		List<Integer> distinctsqure = number.stream().distinct().map(n -> n * n).collect(Collectors.toList());
		System.out.println("Distinct square of list items -> "+distinctsqure);

		// if any fruit start with letter b
		List<String> fruits = Arrays.asList("apple", "banana", "orange", "grape", "kiwi");
		boolean anyMatch = fruits.stream().anyMatch(fruit -> fruit.startsWith("b"));
		System.out.println("Any fruit starts with 'b'-> " + anyMatch);
		
		
		
	}

}
