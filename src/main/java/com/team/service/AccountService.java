package com.team.service;

import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountService {

    private AccountRepository accountRepository ;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public Accounts checkLogin(String email, String password) {
        return accountRepository.findAccountsByEmailAndPassword(email, password);
    }

    public boolean checkEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }

    public boolean checkAccount(String email, String password){
        return accountRepository.existsAccountByEmailAndPassword(email, password);
    }

    public Accounts createAccount(String email, String password) {
        Accounts accounts = new Accounts();
        accounts.setEmail(email);
        accounts.setPassword(password);
        accounts.setRole("CUS");
        return accountRepository.save(accounts);
    }
}
