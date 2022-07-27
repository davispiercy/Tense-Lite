package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.service.AssignmentService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AssignmentController (val assignmentService: AssignmentService){
    @GetMapping("/assignments")
    fun findAll(): List<Assignment> {
        return assignmentService.findAll()
    }
    @GetMapping("/getProjectsByUser/{user_id}")
    fun findAssignments(@PathVariable("user_id") user_id: Long) : List<Long> {
        return assignmentService.findAssignments(user_id)
    }
    @PostMapping("/createAssignment")
    fun createAssignment(@RequestBody assignment: Assignment) : Assignment {
        assignmentService.createAssignment(assignment)
        return assignment
    }
}