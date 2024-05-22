package com.team.repository;

import com.team.model.Accounts;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

public interface AccountRepository extends JpaRepository<Accounts, Integer> {

    Accounts findById(int id);

}
