package com.jahnelgroup.tenselite.tenselite.service

import com.fasterxml.jackson.databind.util.JSONPObject
import com.jahnelgroup.tenselite.tenselite.entity.User
import com.jahnelgroup.tenselite.tenselite.repository.UserRepository
import org.apache.tomcat.util.json.JSONParser
import org.springframework.boot.json.GsonJsonParser
import org.springframework.stereotype.Service

@Service
class UserService (val userRepository: UserRepository){
    fun findAll(): List<User> {
        return userRepository.findAll()
    }
    fun getUser(user_id: Long) : User {
        return userRepository.findById(user_id).get()
    }
    fun createUser(user: User) : User {
        userRepository.save(user)
        return user
    }
    fun updateUser(user: User) : User {
        userRepository.save(user)
        return user
    }
    fun deleteUser(user_id: Long) : User {
        userRepository.deleteById(user_id)
        return userRepository.findById(user_id).get()
    }
}