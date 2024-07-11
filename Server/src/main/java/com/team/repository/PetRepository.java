package com.team.repository;

import com.team.model.Pets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository  extends JpaRepository<Pets, Integer> {
}
