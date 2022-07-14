package com.jahnelgroup.tenselite.tenselite.service

import com.fasterxml.jackson.databind.util.JSONPObject
import com.jahnelgroup.tenselite.tenselite.entity.User
import com.jahnelgroup.tenselite.tenselite.repository.UserRepository
import org.apache.tomcat.util.json.JSONParser
import org.springframework.boot.json.GsonJsonParser
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService (val userRepository: UserRepository){
    fun findAll(): List<User> {
        return userRepository.findAll()
    }
    fun getUser(user_id: Long) : User {
        return userRepository.findById(user_id).get()
    }
    fun checkIfExists(uid: String) : Boolean {
        return userRepository.checkIfExists(uid)
    }
    fun getUserId(uid: String) : Long {
        return userRepository.getUserId(uid)
    }
    fun getUserByEmail(email: String) : User {
        return userRepository.getUserByEmail(email)
    }
    fun getUserById(uid: String) : User {
        return userRepository.getUserById(uid)
    }
    fun getEnabledUsers(): List<User> {
        return userRepository.findByEnabledTrue();
    }
    fun createUser(user: User) : User {
        userRepository.save(user)
        return user
    }
    fun updateUser(user: User) : User {
        userRepository.save(user)
        return user
    }
    fun deleteUser(user_id: Long) : Optional<User> {
        var user: Optional<User> = userRepository.findById(user_id)
        userRepository.deleteById(user_id)
        return user
    }
}