package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.entity.AssignmentId
import com.jahnelgroup.tenselite.tenselite.repository.AssignmentRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class AssignmentService (val assignmentRepository: AssignmentRepository){
    fun findAll(): List<Assignment> {
        return assignmentRepository.findAll()
    }
    fun findAssignments(user_id: Long) : List<Long> {
        return assignmentRepository.findAssignments(user_id)
    }
    fun findAssignment(user_id: Long, project_id: Long) : Optional<Assignment> {
        val id = AssignmentId(user_id, project_id)
        return assignmentRepository.findById(id)
    }
    fun createAssignment(assignment: Assignment) : Assignment {
        assignmentRepository.save(assignment)
        return assignment
    }
    fun endAssignment(assignment: Assignment) : Assignment {
        assignmentRepository.save(assignment)
        return assignment
    }
}