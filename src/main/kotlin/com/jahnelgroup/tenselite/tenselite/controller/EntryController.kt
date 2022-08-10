package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import com.jahnelgroup.tenselite.tenselite.service.EntryService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.util.*

@RestController
class EntryController (val entryService: EntryService){
    @GetMapping("/entries")
    fun findAll(): List<Entry> {
        println("testing123")
        return entryService.findAll()
    }
    @GetMapping("/entries/{id}")
    fun findAllById(@PathVariable("id") id: Long) : List<Entry> {
        return entryService.findAllById(id)
    }
    @GetMapping("/entry/{id}")
    fun getEntry(@PathVariable("id") id: Long) : Entry {
        return entryService.getEntry(id)
    }
    @GetMapping("/entriesByDate/{id}/{date}")
    fun getUserEntriesByDate(@PathVariable("id") id: Long, @PathVariable("date") date: String): List<Entry> {
        val rDate = LocalDate.parse(date)
        println(rDate)
        return entryService.getEntryByDate(id, rDate)
    }
    @GetMapping("/entries/{user_id}/{project_id}")
    fun getEntriesUserProject(@PathVariable("user_id") user_id: Long, @PathVariable("project_id") project_id: Long) : List<Entry> {
        return entryService.getEntriesUserProject(user_id, project_id)
    }
    @PostMapping("/addEntry")
    fun addEntry(@RequestBody entry: Entry) : Entry {
        entryService.addEntry(entry)
        return entry
    }
    @PatchMapping("/updateEntry")
    fun updateEntry(@RequestBody entry: Entry) : Entry {
        return entryService.updateEntry(entry)
    }
    @DeleteMapping("/deleteEntry/{id}")
    fun deleteEntry(@PathVariable("id") id: Long) : Optional<Entry> {
        return entryService.deleteEntry(id)
    }
    @GetMapping("/entrysByDate/{id}/{date}")
    fun getUserEntrysByDate(@PathVariable("id") id: Long, @PathVariable("date") date: String): LocalDate{
        val rDate = LocalDate.parse(date)
        println("rDate")
        return rDate
    }
}