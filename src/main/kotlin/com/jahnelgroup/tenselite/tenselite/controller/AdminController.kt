package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.User
import com.jahnelgroup.tenselite.tenselite.service.UserService
import com.jahnelgroup.tenselite.tenselite.entity.Project
import com.jahnelgroup.tenselite.tenselite.service.ProjectService
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class AdminController (val userService: UserService, val projectService: ProjectService){
    @GetMapping("/admin/users")
    fun getAll(): List<User> {
        return userService.findAll()
    }

}