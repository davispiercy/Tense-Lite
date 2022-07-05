package com.jahnelgroup.tenselite.tenselite.repository

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EntryRepository: JpaRepository<Entry, Long> {
}