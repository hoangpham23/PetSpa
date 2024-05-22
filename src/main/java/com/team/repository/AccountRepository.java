package com.team.repository;

import com.team.model.Accounts;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends ListCrudRepository<Accounts, Integer> {

    Accounts findAccountByEmailAndPassword(String email, String password);
    boolean existsAccountByEmail(String email);
    Accounts findById(int id);

}
