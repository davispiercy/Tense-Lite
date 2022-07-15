package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.repository.AssignmentRepository
import org.springframework.stereotype.Service

@Service
class AssignmentService (val assignmentRepository: AssignmentRepository){
    fun findAll(): List<Assignment> {
        return assignmentRepository.findAll()
    }
    fun findAssignments(user_id: Long) : List<Long> {
        return assignmentRepository.findAssignments(user_id)
    }
}