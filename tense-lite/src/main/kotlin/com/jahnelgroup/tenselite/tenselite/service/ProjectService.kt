package com.jahnelgroup.tenselite.tenselite.service

import com.jahnelgroup.tenselite.tenselite.entity.Project
import com.jahnelgroup.tenselite.tenselite.repository.ProjectRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class ProjectService (val projectRepository: ProjectRepository){
    fun findAll(): List<Project> {
        return projectRepository.findAll()
    }
    fun getProject(id: Long) : Project {
        return projectRepository.findById(id).get()
    }
    fun createProject(project: Project) : Project {
        projectRepository.save(project)
        return project
    }
    fun updateProject(project: Project) : Project {
        projectRepository.save(project)
        return project
    }
    fun deleteProject(id: Long) : Optional<Project> {
        var project: Optional<Project> = projectRepository.findById(id)
        projectRepository.deleteById(id)
        return project
    }
}