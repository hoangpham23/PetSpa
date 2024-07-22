package com.team.repository;

import com.team.model.Accounts;
import com.team.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer> {

    Accounts findAccountsByEmailAndPassword(String email, String password);
    boolean existsAccountByEmail(String email);
    boolean existsAccountByEmailAndPassword(String email, String password);

    Accounts findByEmail(String email);
}
