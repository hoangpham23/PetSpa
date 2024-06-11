package com.team.service;

import com.team.dto.AccountDTO;
import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AccountService {

    private final AccountRepository accountRepository ;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public AccountDTO checkLogin(String email, String password) {

        Accounts accounts = accountRepository.findAccountsByEmailAndPassword(email, password);
        if (accounts == null) {
            return null;
        }
        return convertToDTO(accounts);
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

    private AccountDTO convertToDTO(Accounts accounts) {
        AccountDTO dto = new AccountDTO();
        dto.setAccountID(accounts.getAccountID());
        dto.setEmail(accounts.getEmail());
        dto.setRole(accounts.getRole());
        return dto;
    }
}
