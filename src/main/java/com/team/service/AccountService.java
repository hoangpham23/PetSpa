package com.team.service;


import com.team.model.Account;
import com.team.repository.AccountRepository;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository ;


    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account checkLogin(String email, String password) {
        return accountRepository.findAccountByEmailAndPassword(email, password);
    }

    public Account findAccountID(String email, String password) {
        return accountRepository.findAccountByEmailAndPassword(email,password);
    }

    public boolean checkEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }

    public void createAccount(String email, String password) {
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(password);
        account.setRole("CUS");
        accountRepository.save(account);
    }

}
