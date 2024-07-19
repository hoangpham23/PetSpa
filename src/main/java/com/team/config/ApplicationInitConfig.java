package com.team.config;


import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class ApplicationInitConfig {

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository) {
        return args -> {
            if (!accountRepository.existsAccountByEmail("pawfection392@gmail.com")) {
                Accounts accounts = new Accounts();
                accounts.setEmail("pawfection392@gmail.com");
                accounts.setPassword("admin");
                accounts.setRole("AD");
                accountRepository.save(accounts);
                log.warn("Admin account has been created with default password. Please change it!");
            }
        };
    }
}
