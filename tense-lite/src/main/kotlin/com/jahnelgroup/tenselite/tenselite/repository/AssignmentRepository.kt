package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.entity.AssignmentId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AssignmentRepository: JpaRepository<Assignment, AssignmentId> {
}