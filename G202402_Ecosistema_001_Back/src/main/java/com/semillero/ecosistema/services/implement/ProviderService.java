package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.DTO.*;
import com.semillero.ecosistema.entities.*;
import com.semillero.ecosistema.mapper.*;
import com.semillero.ecosistema.repositories.*;
import com.semillero.ecosistema.services.IProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProviderService implements IProviderService {
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProviderMapper providerMapper;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private ProviderCreateMapper providerCreateMapper;

    @Autowired
    private ProvinceMapper provinceMapper;


    @Override
    public ResponseEntity<?> updateState(Long id, StateDto stateDto) {
        Optional<Provider> providerOptional = providerRepository.findById(id);
        if (providerOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Provider not found.");
        }


        if ( providerOptional.get().getState() == State.INITIAL_REVIEW || providerOptional.get().getState() == State.CHANGES_MADE ) {
            Provider provider = providerOptional.get();
            provider.setState(stateDto.getState());

            provider.setFeedback(stateDto.getFeedback());
            Provider updatedProvider = providerRepository.save(provider);
            ProviderDTO updatedProviderDTO = providerMapper.toDto(updatedProvider);
            return ResponseEntity.ok(updatedProviderDTO);
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    @Override
    public ResponseEntity<?> createProvider(ProviderCreateDTO providerDTO, String userName) {

        Optional<User> user = userRepository.findByUserName(userName);
        if(user.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        Country country = countryRepository.findById(providerDTO.getCountryId()).orElse(null);
        Province province = provinceRepository.findById(providerDTO.getProvinceId()).orElse(null);
        Category category = categoryRepository.findById(providerDTO.getCategoryId()).orElse(null);
        List<Provider> providers = user.get().getProvider();

        long sizeProviders = providers.size();
        if (sizeProviders >=3) {
            return ResponseEntity.badRequest().build();
        }

        Provider newProvider = providerCreateMapper.toEntity(providerDTO);
        newProvider.setCategory(category);
        newProvider.setCountry(country);
        newProvider.setProvince(province);
        newProvider.setUser(user.get());
        newProvider.setState(State.INITIAL_REVIEW);
        newProvider.setFeedback("Producto/Servicio en revision");
        newProvider.setCreationDate(LocalDate.now());

        Provider savedProvider = providerRepository.save(newProvider);

        return ResponseEntity.ok().body(providerMapper.toDto(savedProvider));
    }


    @Override
    public ResponseEntity<?> updateProvider(ProviderCreateDTO providerDTO, String email) {
        User user = userRepository.findByUserName(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Provider> providerOptional = providerRepository.findById(providerDTO.getId());
        if (providerOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Provider not found.");
        }

        if (!user.equals(providerOptional.get().getUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para editar este proveedor.");
        }
        Provider provider1 = providerCreateMapper.toEntity(providerDTO);
        provider1.setState(State.CHANGES_MADE);
        provider1.setFeedback("Producto/Servicio en revision");
        provider1.setUser(user);
        provider1.setCreationDate(LocalDate.now());
        Provider updatedProvider = providerRepository.save(provider1);
        ProviderCreateDTO providerCreateDTO = providerCreateMapper.toDto(updatedProvider);
        return ResponseEntity.ok(providerCreateDTO);
    }

    @Override
    public ResponseEntity<?> getProvider(Long id) {
        Optional<Provider> providerOptional = providerRepository.findById(id);
        if (providerOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Image> images = providerRepository.findImageByProviderId(providerOptional.get().getId());
        List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);

        Provider provider = providerOptional.get();
        List<Province> provinces = countryRepository.findProvinceByCountryId(provider.getCountryId());
        List<ProvinceDTO> provinceDTOS = provinceMapper.toProvinceDTOList(provinces);
        ProviderDTO providerDTO = providerMapper.toDto(provider);

        providerDTO.setImages(imageDTOList);
        providerDTO.getCountry().setProvinces(provinceDTOS);
        return ResponseEntity.ok(providerDTO);
    }

    @Override
    public ResponseEntity<?> getAllProviders() {
        List<Provider> providers = providerRepository.findAll();

        if (providers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
         List<ProviderDTO> providerDTOs = providers.stream()
                .map(providerMapper::toDto)
                .collect(Collectors.toList());
         providerDTOs.forEach(providerDTO -> {
             List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
             List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
             providerDTO.setImages(imageDTOList);
         });
        return ResponseEntity.ok(providerDTOs);
    }

    @Override
    public ResponseEntity<?> getAccepted() {
        List<Provider> providers = providerRepository.findAllByStateAndDeletedFalse(State.ACCEPTED);
        List<ProviderDTO> providerDTOs = providers.stream()
                .map(providerMapper::toDto)
                .collect(Collectors.toList());
        providerDTOs.forEach(providerDTO -> {
            List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
            List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
            providerDTO.setImages(imageDTOList);
        });
        return ResponseEntity.ok(providerDTOs);
    }

    @Override
    public ResponseEntity<?> getAcceptedProvidersByCategory(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Category category = categoryOptional.get();
        List<Provider> providers = providerRepository.findByCategoryAndStateAndDeletedFalse(category, State.ACCEPTED);
        List<ProviderDTO> providerDTOs = providers.stream()
                .map(providerMapper::toDto)
                .collect(Collectors.toList());
        providerDTOs.forEach(providerDTO -> {
            List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
            List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
            providerDTO.setImages(imageDTOList);
        });
        return ResponseEntity.ok(providerDTOs);
    }


    @Override
    public ResponseEntity<?> searchProvidersByName(String name) {

        if (name == null || name.isEmpty()) {
            return ResponseEntity.badRequest().body("La consulta de búsqueda está vacía");
        }
        List<Provider> providers = providerRepository.findByNameContainingIgnoreCase(name);

        if (providers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<ProviderDTO> providerDTOs = providers.stream()
                .map(providerMapper::toDto)
                .collect(Collectors.toList());
        providerDTOs.forEach(providerDTO -> {
            List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
            List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
            providerDTO.setImages(imageDTOList);
        });
        return ResponseEntity.ok(providerDTOs);
    }

    @Override
    public List<Provider> findAll() {
        List<Provider> providers = providerRepository.findAll();
        List<Provider> findProvidersWeek = providers.stream()
                .filter(provider -> (Period.between(provider.getCreationDate(), LocalDate.now()).getDays() < 7)).toList();
        List<Provider> providerList = new ArrayList<>();
        findProvidersWeek.forEach(provider -> {
            if(provider.getState() == State.ACCEPTED){
                providerList.add(provider);
            }
        });
        return providerList;
    }

    public DashboardInfo getDashboardInfo() {
        List<Category> categories = categoryRepository.findAll();

        DashboardInfo dashboardInfo = new DashboardInfo();

        List<CategoryListInfo> categoryListInfoList = new ArrayList<>();

        for (Category category : categories) {
            Long providerCount = providerRepository.countByCategoryId(category.getId());
            CategoryListInfo categoryListInfo = new CategoryListInfo(category.getName(), providerCount);
            categoryListInfoList.add(categoryListInfo);
        }

        dashboardInfo.setStateSizeDenied(providerRepository.countProvidersByState(State.DENIED));
        dashboardInfo.setStateSizeAccepted(providerRepository.countProvidersByState(State.ACCEPTED));
        Long cantRequiresChanges = providerRepository.countProvidersByState(State.REQUIRES_CHANGES);
        Long cantChangesMade = providerRepository.countProvidersByState(State.CHANGES_MADE);

        dashboardInfo.setStateSizeReview(cantRequiresChanges + cantChangesMade);

        dashboardInfo.setNewProviders(providerRepository.countProvidersByState(State.INITIAL_REVIEW));
        dashboardInfo.setCategoryListInfo(categoryListInfoList);

        return dashboardInfo;
    }

    @Override
    public ResponseEntity<?> getByLocation(String username) {
        Optional<User> user = userRepository.findByUserName(username);
        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<Provider> providers = providerRepository.findByProvinceId(user.get().getProvinceId());
        if(providers.size() >0){
            List<ProviderDTO> providerList = new ArrayList<>();
            providers.forEach(provider -> {
                if(provider.getState().equals(State.ACCEPTED)){
                    ProviderDTO providerDTO = providerMapper.toDto(provider);
                    List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
                    List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
                    providerDTO.setImages(imageDTOList);
                    providerList.add(providerDTO);
                }
            });
            return ResponseEntity.ok().body(providerList);
        }else {

            List<Provider> providers1 = providerRepository.findByCountryId(user.get().getCountryId());
            if(providers1.size() >0){
                List<ProviderDTO> providerList1 = new ArrayList<>();
                providers1.forEach(provider -> {
                    if(provider.getState().equals(State.ACCEPTED)){
                        ProviderDTO providerDTO = providerMapper.toDto(provider);
                        List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
                        List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
                        providerDTO.setImages(imageDTOList);
                        providerList1.add(providerDTO);
                    }
                });
                return ResponseEntity.ok().body(providerList1);
            }
        }

        List<Provider> providerList2 = providerRepository.findProvidersStateAccepted();
        if(providerList2.size() <4){
            List<ProviderDTO> providers1 = providerMapper.listToDto(providerList2);
            providers1.forEach(providerDTO -> {
                List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
                List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
                providerDTO.setImages(imageDTOList);
            });
            return ResponseEntity.ok().body(providers1);
        }
        List<Provider> lastFour = providerList2.subList(providerList2.size() -4,providerList2.size());
        List<ProviderDTO> providerDTOS = providerMapper.listToDto(lastFour);
        providerDTOS.forEach(providerDTO -> {
            List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
            List<ImageDTO> imageDTOList = providerMapper.imageListToDto(images);
            providerDTO.setImages(imageDTOList);
        });
        return ResponseEntity.ok().body(providerDTOS);

    }


}
