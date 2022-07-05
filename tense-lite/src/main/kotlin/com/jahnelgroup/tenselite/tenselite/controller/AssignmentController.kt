package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Assignment
import com.jahnelgroup.tenselite.tenselite.service.AssignmentService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AssignmentController (val assignmentService: AssignmentService){
    @GetMapping("/assignments")
    fun findAll(): List<Assignment> {
        return assignmentService.findAll()
    }
}