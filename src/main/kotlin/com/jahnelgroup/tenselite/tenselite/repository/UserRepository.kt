package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Long> {

    @Query("select u from User u where u.enabled = false")
    fun findByDisabled(): List<User>

    @Query("select u.first_name from User u where u.uid = ?1")
    fun getName(uid: String): String


    @Query("select u.sec_group from User u where u.uid = ?1")
    fun getRole(sec_group: String): String


    @Query("select u from User u where u.enabled = true")
    fun findByEnabledTrue(): List<User>

    @Query("select u.id from User u where u.uid = ?1")
    fun getUserId(uid: String): Long

    @Query("select u from User u where u.email = ?1")
    fun getUserByEmail(email: String): User

    @Query("select u from User u where u.uid = ?1")
    fun getUserById(uid: String): User

    @Query("select (count(u) > 0) from User u where u.uid = ?1")
    fun checkIfExists(uid: String): Boolean

}