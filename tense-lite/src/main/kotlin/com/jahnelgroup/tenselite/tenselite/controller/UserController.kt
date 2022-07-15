package com.jahnelgroup.tenselite.tenselite.controller

import com.fasterxml.jackson.databind.util.JSONPObject
import com.jahnelgroup.tenselite.tenselite.entity.User
import com.jahnelgroup.tenselite.tenselite.service.UserService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class UserController (val userService: UserService) {
    @GetMapping("/users")
    fun findAll(): List<User> {
        return userService.findAll()
    }
    @GetMapping("/userExists/{uid}")
    fun checkIfExists(@PathVariable("uid") uid: String) : Boolean {
        return userService.checkIfExists(uid)
    }
    @GetMapping("/enabledUsers")
    fun findEnabledUsers(): List<User> {
        return userService.getEnabledUsers()
    }
    @CrossOrigin(origins = arrayOf("http://localhost:8080"))
    @GetMapping("/findUserId/{uid}")
    fun getUserId(@PathVariable("uid") uid: String) : Long {
        return userService.getUserId(uid)
    }
    @GetMapping("/userByEmail/{email}")
    fun getUserByEmail(@PathVariable("email") email: String) : User {
        return userService.getUserByEmail(email)
    }
    @GetMapping("/userById/{uid}")
    fun getUserById(@PathVariable("uid") uid: String) : User {
        return userService.getUserById(uid)
    }
    @GetMapping("/user/{id}")
    fun getUser(@PathVariable("id") id: Long) :User {
        return userService.getUser(id)
    }
    @PostMapping("/createUser")
    fun createUser(@RequestBody user: User) : User {
        userService.createUser(user)
        return user
    }
    @PatchMapping("/updateUser")
    fun updateUser(@RequestBody user:User) : User {
        userService.updateUser(user)
        return user
    }
    @DeleteMapping("/deleteUser/{id}")
    fun deleteUser(@PathVariable("id") id: Long) : Optional<User> {
        return userService.deleteUser(id)
    }

}