package com.jahnelgroup.tenselite.tenselite

import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.*
import javax.servlet.http.HttpServletRequest

@Component
@Order(1)
class RequestFilter : Filter {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse?,
        chain: FilterChain
    ) {
        val req: HttpServletRequest = request as HttpServletRequest
        /*LOG.info(
            "Starting a transaction for req : {}",
            req.getRequestURI()
        )*/
        chain.doFilter(request, response)
        /*LOG.info(
            "Committing a transaction for req : {}",
            req.getRequestURI()
        )*/
    } // other methods
}