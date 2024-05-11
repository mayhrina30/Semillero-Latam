package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.entities.Provider;
import com.semillero.ecosistema.services.IEmailService;
import com.semillero.ecosistema.services.IProviderService;
import com.semillero.ecosistema.services.IUserService;
import com.semillero.ecosistema.utils.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.util.List;

@Service
public class EmailServiceImpl implements IEmailService {


    @Autowired
    private IUserService userService;

    @Autowired
    private IProviderService providerService;

    @Autowired
    private EmailUtil emailUtil;


    public void sendHTMLEmail() throws Exception {
        try {
            List<Provider> providers = providerService.findAll();
            Context context = new Context();
            context.setVariable("providers",providers);

            String[] users = userService.findAllUsersEmail();
            emailUtil.sendHTMLEmail(
                    users,
                    "Novedades Ecos",
                    context
            );
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
