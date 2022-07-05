package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import com.jahnelgroup.tenselite.tenselite.repository.EntryRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class EntryService (val entryRepository: EntryRepository){
    fun findAll(): List<Entry> {
        return entryRepository.findAll()
    }
}