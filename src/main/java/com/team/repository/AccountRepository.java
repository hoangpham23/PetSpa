package com.team.repository;

import com.team.model.Accounts;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends ListCrudRepository<Accounts, Integer> {

    Accounts findAccountByEmailAndPassword(String email, String password);
    boolean existsAccountByEmail(String email);
}
