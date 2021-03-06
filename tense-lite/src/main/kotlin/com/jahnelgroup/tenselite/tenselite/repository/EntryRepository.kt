package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EntryRepository: JpaRepository<Entry, Long> {

    @Query("select e from Entry e where e.user_id = ?1 and e.date = ?2")
    fun getEntryByDate(id: Long, date: Date): List<Entry>

    @Query("select e from Entry e where e.user_id = ?1")
    fun findByUserId(user_id: Long): List<Entry>
}