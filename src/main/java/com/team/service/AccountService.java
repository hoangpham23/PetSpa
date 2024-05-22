package com.team.service;

import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
    }

    public void updatePassword(Accounts accounts){
        accountRepository.save(accounts);
    }
    public Accounts findById(int id){
        return accountRepository.findById(id);
    }
}
