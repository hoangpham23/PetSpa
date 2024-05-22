package com.team.repository;

import com.team.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

public interface CustomerRepository extends JpaRepository<Customers,Integer> {
    Customers findByEmail(String email);
//check query
//    @Query("UPDATE Accounts u SET u.Password = ?2 WHERE u.Username = ?1")
//    void updatePassword(String email, String password);
}
