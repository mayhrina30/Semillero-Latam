package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.DTO.DashboardInfo;
import com.semillero.ecosistema.DTO.ProviderCreateDTO;
import com.semillero.ecosistema.DTO.StateDto;
import com.semillero.ecosistema.services.IProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/provider")
public class ProviderController {


    private final IProviderService providerService;
    @Autowired
    public ProviderController(IProviderService providerService){ this.providerService = providerService; }

    @GetMapping("/get")
    public ResponseEntity<?> getProvider(@RequestParam Long id){return providerService.getProvider(id);}

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllProviders (){
        return providerService.getAllProviders() ;
    }


    @GetMapping("/accepted")
    public ResponseEntity<?> getAllAcceptedProviders() {
        return providerService.getAccepted();
    }


    @GetMapping("/accepted-by-category")
    public ResponseEntity<?> getAcceptedProvidersByCategory(@RequestParam Long categoryId) {
        return providerService.getAcceptedProvidersByCategory(categoryId);
    }


    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<?> createProvider(@RequestBody ProviderCreateDTO providerDTO, @RequestParam String email){
            return providerService.createProvider(providerDTO, email);
    }
    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateProvider(@RequestBody ProviderCreateDTO providerDTO, @RequestParam String email) {
            return providerService.updateProvider(providerDTO, email);
    }

    @PutMapping("/update-state")
    @ResponseBody
    public ResponseEntity<?> updateStateAndFeedback(@RequestParam Long id, @RequestBody StateDto stateDto) {
       return providerService.updateState(id,stateDto);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchProvidersByName(@RequestParam(required = false) String name) {
        try {

            if (name == null || name.isEmpty()) {
                return ResponseEntity.badRequest().body("El parámetro de búsqueda está vacío");
            }


            ResponseEntity<?> searchResult = providerService.searchProvidersByName(name);


            if (searchResult.getStatusCode().is2xxSuccessful()) {
                return searchResult;
            } else {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en la búsqueda de proveedores");
            }
        } catch (NoSuchElementException e) {

            return ResponseEntity.notFound().build();
        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor al buscar proveedores");
        }
    }

    @GetMapping("/dashboard-info")
    public ResponseEntity<?> getDashboardInfo() { DashboardInfo dashboardInfo = providerService.getDashboardInfo();
        return ResponseEntity.ok(dashboardInfo);
    }

    @GetMapping("/location")
    public ResponseEntity<?> getByUserLocation(@RequestParam String email){
        return providerService.getByLocation(email);
    }
}
