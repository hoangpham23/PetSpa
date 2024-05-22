package com.team.repository;

import com.team.model.Account;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends ListCrudRepository<Account, Integer> {

    Account findAccountByEmailAndPassword(String email, String password);
    boolean existsAccountByEmail(String email);
}
