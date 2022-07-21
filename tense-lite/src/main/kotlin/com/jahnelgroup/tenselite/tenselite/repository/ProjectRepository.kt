package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.Project
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository: JpaRepository<Project, Long> {

    @Query("select p.name from Project p where p.id = ?1")
    fun getProjectName(id: Long): String


    @Query("select p from Project p where p.enabled = true")
    fun findAllEnabled(): List<Project>
}