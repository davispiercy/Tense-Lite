package com.jahnelgroup.tenselite.tenselite.entity

import com.fasterxml.jackson.annotation.JsonUnwrapped
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDate
import javax.persistence.*
import java.io.Serializable


@Embeddable
data class AssignmentId(
    @Column(name = "user_id")
    var user_id: Long? = null,

    @Column(name = "project_id")
    var project_id: Long? = null
) : Serializable

@Entity
@Table(name = "assignments")
@EntityListeners(AuditingEntityListener::class)
class Assignment {

    @EmbeddedId
    @JsonUnwrapped
    lateinit var assignmentId: AssignmentId

    @Column(name = "hourly_rate")
    var hourly_rate: Double = 0.0

    @Column(name = "start_date")
    var start_date: LocalDate? = null

    @Column(name = "end_date")
    var end_date: LocalDate? = null

    @Column(name = "enabled")
    var enabled: Boolean = true
}