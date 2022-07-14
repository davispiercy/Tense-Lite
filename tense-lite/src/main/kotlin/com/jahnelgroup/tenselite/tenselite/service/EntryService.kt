package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import com.jahnelgroup.tenselite.tenselite.entity.Project
import com.jahnelgroup.tenselite.tenselite.repository.EntryRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class EntryService (val entryRepository: EntryRepository){
    fun findAll(): List<Entry> {
        return entryRepository.findAll()
    }
    fun findAllById(id: Long) : List<Entry> {
        return entryRepository.findByUserId(id)
    }
    fun getEntry(id: Long) : Entry {
        return entryRepository.findById(id).get()
    }
    fun addEntry(entry: Entry) : Entry {
        entryRepository.save(entry)
        return entry
    }
    fun updateEntry(entry: Entry) : Entry {
        entryRepository.save(entry)
        return entry
    }
    fun deleteEntry(id: Long) : Optional<Entry> {
        var entry: Optional<Entry> = entryRepository.findById(id)
        entryRepository.deleteById(id)
        return entry
    }
}