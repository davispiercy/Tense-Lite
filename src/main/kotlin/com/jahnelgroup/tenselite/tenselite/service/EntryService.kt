package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import com.jahnelgroup.tenselite.tenselite.repository.EntryRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
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
    fun getEntryByDate(user_id: Long, date: LocalDate): List<Entry> {
        return entryRepository.getEntryByDate(user_id, date)
    }
    fun getEntriesUserProject(user_id: Long, project_id: Long): List<Entry> {
        return entryRepository.getEntriesUserProject(user_id, project_id)
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