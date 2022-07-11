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
import java.util.*

@RestController
class EntryController (val entryService: EntryService){
    @GetMapping("/entries")
    fun findAll(): List<Entry> {
        return entryService.findAll()
    }
    @GetMapping("/entry/{id}")
    fun getEntry(@PathVariable("id") id: Long) : Entry {
        return entryService.getEntry(id)
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
}