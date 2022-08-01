package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.entity.AssignmentId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AssignmentRepository: JpaRepository<Assignment, AssignmentId> {

    @Query("select a.assignmentId.project_id from Assignment a where a.assignmentId.user_id = ?1")
    fun findProjectIds(user_id: Long): List<Long>

    @Query("select a from Assignment a where a.assignmentId.user_id = ?1 and a.enabled = true")
    fun findAssignments(user_id: Long): List<Assignment>

    @Query("select a from Assignment a where a.assignmentId.user_id = ?1 and a.enabled = false")
    fun findDisabledAssignments(user_id: Long): List<Assignment>

}