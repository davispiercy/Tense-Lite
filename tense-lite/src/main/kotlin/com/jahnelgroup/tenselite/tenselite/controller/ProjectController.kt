package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Project
import com.jahnelgroup.tenselite.tenselite.service.ProjectService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class ProjectController (val projectService: ProjectService){
    @GetMapping("/projects")
    fun findAll(): List<Project> {
        return projectService.findAll()
    }
    @GetMapping("/enabledProjects")
    fun findAllEnabled(): List<Project> {
        return projectService.findAllEnabled()
    }
    @GetMapping("/disabledProjects")
    fun findAllDisabled(): List<Project> {
        return projectService.findAllDisabled()
    }
    @GetMapping("/projects/{id}")
    fun getProject(@PathVariable("id") id: Long) : Project {
        return projectService.getProject(id)
    }
    @GetMapping("/getProjects/{ids}")
    fun getProjects(@PathVariable("ids") ids: List<Long>) : List<Project> {
        return projectService.getProjects(ids)
    }
    @GetMapping("/getProjectName/{id}")
    fun getProjectName(@PathVariable("id") id: Long) : String {
        return projectService.getProjectName(id)
    }
    @PostMapping("/createProject")
    fun createProject(@RequestBody project: Project) : Project {
        projectService.createProject(project)
        return project
    }
    @PatchMapping("/updateProject")
    fun updateProject(@RequestBody project: Project) : Project {
        projectService.updateProject(project)
        return project
    }
    @DeleteMapping("/deleteProject/{id}")
    fun deleteProject(@PathVariable("id") id: Long) : Optional<Project> {
        return projectService.deleteProject(id)
    }

}