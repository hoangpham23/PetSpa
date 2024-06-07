package com.team.service;

import com.team.dto.AccountDTO;
import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import jakarta.persistence.*;
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


//    public Accounts checkAccountV3(String email, String password) {
//        String sql = "SELECT * FROM accounts WHERE email = ? AND password = ?";
//
//        return jdbcTemplate.queryForObject(sql, new Object[]{email, password}, accountRowMapper());
//    }
//
//    private RowMapper<Accounts> accountRowMapper() {
//        return (rs, rowNum) -> {
//            Accounts account = new Accounts();
//            account.setAccountID(rs.getInt("accountID"));
//            account.setEmail(rs.getString("email"));
//            account.setPassword(rs.getString("password"));
//            account.setRole("CUS");
//            return account;
//        };
//    }

    @PersistenceContext
    private EntityManager entityManager;

    public Accounts checkAccountV4(String email, String password) {
        String sql = "SELECT * FROM accounts WHERE email = '" + email + "'" + " AND password = '" + password + "'";
        System.out.println();
        System.out.println("SQL: " + sql);
        Query query = entityManager.createNativeQuery(sql, Accounts.class);
//        return query.getResultList();

        try {
            return (Accounts) query.getSingleResult();
        } catch (NoResultException e) {
            return null; // Handle no result case
        } catch (NonUniqueResultException e) {
            throw new IllegalStateException("More than one user found with email: " + email);
        }

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
