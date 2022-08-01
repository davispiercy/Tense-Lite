package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.service.AssignmentService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class AssignmentController (val assignmentService: AssignmentService){
    @GetMapping("/assignments")
    fun findAll(): List<Assignment> {
        return assignmentService.findAll()
    }
    @GetMapping("/getAssignment/{user_id}/{project_id}")
    fun getAssignment(@PathVariable("user_id") user_id: Long, @PathVariable("project_id") project_id: Long): Optional<Assignment> {
        return assignmentService.findAssignment(user_id, project_id)
    }
    @GetMapping("/getAssignmentsByUser/{user_id}")
    fun findAssignments(@PathVariable("user_id") user_id: Long) : List<Assignment> {
        return assignmentService.findAssignments(user_id)
    }
    @GetMapping("/getDisabledAssignmentsByUser/{user_id}")
    fun findDisabledAssignments(@PathVariable("user_id") user_id: Long) : List<Assignment> {
        return assignmentService.findDisabledAssignments(user_id)
    }
    @PostMapping("/createAssignment")
    fun createAssignment(@RequestBody assignment: Assignment) : Assignment {
        assignmentService.createAssignment(assignment)
        return assignment
    }
    @PatchMapping("/endAssignment")
    fun endAssignment(@RequestBody assignment: Assignment) : Assignment {
        assignmentService.endAssignment(assignment)
        return assignment
    }
}