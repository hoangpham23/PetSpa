package com.team.service;

import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository ;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public Accounts checkLogin(String email, String password) {
        return accountRepository.findAccountByEmailAndPassword(email, password);
    }

    public Accounts findAccountID(String email, String password) {
        return accountRepository.findAccountByEmailAndPassword(email,password);
    }

    public boolean checkEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }

    public Accounts createAccount(String email, String password) {
        Accounts accounts = new Accounts();
        accounts.setEmail(email);
        accounts.setPassword(password);
        accounts.setRole("CUS");
        return accountRepository.save(accounts);
    }
    public Accounts findById(int id){
        return accountRepository.findById(id);
    }
}
