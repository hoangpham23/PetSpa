package com.team.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.team.dto.AccountDTO;
import com.team.dto.IntrospectRequest;
import com.team.model.Accounts;
import com.team.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Service
public class AccountService {


    @Value("${SIGNER_KEY}")
    private String SIGNER_KEY;
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);

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

        String token = generateToken(accounts);
        return convertToDTO(accounts, token);
    }

    public boolean checkEmail(String email) {
        return accountRepository.existsAccountByEmail(email);
    }




    public Accounts createAccount(String email, String password, String role) {
        Accounts accounts = new Accounts();
        accounts.setEmail(email);
        accounts.setPassword(password);
        accounts.setRole(role);
        return accountRepository.save(accounts);
    }

    private AccountDTO convertToDTO(Accounts accounts, String token) {
        AccountDTO dto = new AccountDTO();
        dto.setAccountID(accounts.getAccountID());
        dto.setEmail(accounts.getEmail());
        dto.setRole(accounts.getRole());
        dto.setToken(token);
        return dto;
    }

    public boolean introspect(IntrospectRequest request) throws JOSEException, ParseException {
        String token = request.getToken();

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY);
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expireTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(verifier);

        return verified && expireTime.after(new Date());
    }

    public String generateToken(Accounts accounts){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(accounts.getEmail())
                .issuer("pawfection.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                )) // expiration Time jwt
                .claim("scope", accounts.getRole())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }


}
