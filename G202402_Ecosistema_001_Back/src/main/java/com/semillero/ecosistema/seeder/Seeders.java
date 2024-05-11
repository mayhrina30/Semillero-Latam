package com.semillero.ecosistema.seeder;

import com.semillero.ecosistema.entities.*;
import com.semillero.ecosistema.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class Seeders implements CommandLineRunner {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private IPublicationRepository publicationRepository;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private ProvinceRepository provinceRepository;

    @Override
    public void run(String... args) throws Exception {
        loadCategories();
    }

    @Autowired
    private IUserRepository userRepository;

    private void loadCategories() {
        if (categoryRepository.count() == 0) {
            Category category1 = new Category(1L, "Construcción", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691778/a6zqcr5qlsusaxmelhyw.png");
            Category category2 = new Category(2L, "Tecnología", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/eztpbbyhgchjgkpobptb.png");
            Category category3 = new Category(3L, "Indumentaria", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/yyiftahjpkh00qgtrygc.png");
            Category category4 = new Category(4L, "Bienestar", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691778/wtdqj3tibw9jkhdxhwfd.png");
            Category category5 = new Category(5L, "Gastronomía", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/zxoshuh0oct0kq9w29em.png");
            Category category6 = new Category(6L, "Cultivos", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691778/fsl85ppappbgmavn35ra.png");
            Category category7 = new Category(7L, "Transporte", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/yrmbszp8cuk4d6iyhjeg.png");
            Category category8 = new Category(8L, "Reciclaje", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/grktmcdpnlllpw38rtwl.png");
            Category category9 = new Category(9L, "Capacitaciones", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691778/wivm1jd4wulnol0oi49f.png");
            Category category10 = new Category(10L, "Merchandising", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/jz2efkx93rxwxiws4bod.png");
            Category category11 = new Category(11L, "Muebles/Deco", "https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/cc7uprrye7jh07q54dmf.png");
            categoryRepository.save(category1);
            categoryRepository.save(category2);
            categoryRepository.save(category3);
            categoryRepository.save(category4);
            categoryRepository.save(category5);
            categoryRepository.save(category6);
            categoryRepository.save(category7);
            categoryRepository.save(category8);
            categoryRepository.save(category9);
            categoryRepository.save(category10);
            categoryRepository.save(category11);
        }
        if (userRepository.count() == 0) {
            User user1 = new User(1L, "Gabriel", "Nievas", false, Role.ADMIN, "https://lh3.googleusercontent.com/a/ACg8ocJLILFg30029t_SN_ToK6Z2r2KlnLvlj2qyaIZzXCvv=s96-c", "angelgabrielnievas@gmail.com", null,null,null,null,null);
            User user2 = new User(2L, "Gabriel", "Bosio", false, Role.ADMIN, "", "gabrielbosio9453@gmail.com", null,null,null,null,null);
            User user3 = new User(3L, "Mayra", "Gonzales", false, Role.ADMIN, "", "urielortega300@gmail.com", null,null,null,null,null);
            User user4 = new User(4L, "Diego", "Galeano", false, Role.ADMIN, "", "diegogaleano.ar@gmail.com", null,null,null,null,null);
            User user5 = new User(5L, "Ricardo", "Modon", false, Role.ADMIN, "", "ricardomodon@gmail.com", null,null,null,null,null);
            User user6 = new User(6L, "Yefry", "Rodelo", false, Role.ADMIN, "", "yefryrodelo@gmail.com", null,null,null,null,null);
            User user7 = new User(7L, "Ander", "Fusion", false, Role.ADMIN, "", "anderfusion@gmail.com", null,null,null,null,null);
            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(user4);
            userRepository.save(user5);
            userRepository.save(user6);
            userRepository.save(user7);
        }
        if (provinceRepository.count() == 0 && countryRepository.count() == 0) {

            Country argentina = new Country();
            argentina.setId(1L);
            argentina.setName("Argentina");
            countryRepository.save(argentina);


            Province buenosAires = new Province();
            buenosAires.setName("Buenos Aires");
            buenosAires.setCountryId(1L);
            provinceRepository.save(buenosAires);

            Province cordoba = new Province();
            cordoba.setName("Cordoba");
            cordoba.setCountryId(1L);
            provinceRepository.save(cordoba);

            Province santaFe = new Province();
            santaFe.setName("Santa Fe");
            santaFe.setCountryId(1L);
            provinceRepository.save(santaFe);

            Country uruguay = new Country();
            uruguay.setId(2L);
            uruguay.setName("Uruguay");
            countryRepository.save(uruguay);

            Province montevideo = new Province();
            montevideo.setName("Montevideo");
            montevideo.setCountryId(2L);
            provinceRepository.save(montevideo);


            Province canelones = new Province();
            canelones.setName("Canelones");
            canelones.setCountryId(2L);
            provinceRepository.save(canelones);

            Province maldonado = new Province();
            maldonado.setName("Maldonado");
            maldonado.setCountryId(2L);
            provinceRepository.save(maldonado);


            Country peru = new Country();
            peru.setId(3L);
            peru.setName("Peru");
            countryRepository.save(peru);

            Province lima = new Province();
            lima.setName("Lima");
            lima.setCountryId(3L);
            provinceRepository.save(lima);

            Province arequita = new Province();
            arequita.setName("Arequita");
            arequita.setCountryId(3L);
            provinceRepository.save(arequita);
        }
        if (providerRepository.count() == 0) {


            Category category = new Category();
            category.setId(1L);
            category.setName("Construcción");
            category.setImage("https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691778/a6zqcr5qlsusaxmelhyw.png");

            Category category1 = new Category();
            category1.setId(2L);
            category1.setName("Tecnología");
            category1.setImage("https://res.cloudinary.com/dlg2nbtly/image/upload/v1712691777/eztpbbyhgchjgkpobptb.png");

            User user = new User(1L, "gabriel", "nievas", false, Role.ADMIN
                    , "https://lh3.googleusercontent.com/a/ACg8ocJLILFg30029t_SN_ToK6Z2r2KlnLvlj2qyaIZzXCvv=s96-c"
                    , "angelgabrielnievas@gmail.com", null,null,null,null,null);

            Provider provider1 = new Provider();
            provider1.setId(1L);
            provider1.setName("Lavanda");
            provider1.setDescription("Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.");
            provider1.setPhone("https://www.instagram.com/");
            provider1.setEmail("ejemplo@gmail.com");
            provider1.setFacebook("https://www.instagram.com/");
            provider1.setInstagram("https://www.instagram.com/");
            provider1.setState(State.ACCEPTED);
            provider1.setActive(true);
            provider1.setDeleted(false);
            provider1.setFeedback("");
            provider1.setCategoryId(category.getId());
            provider1.setUser(user);
            provider1.setProvinceId(1L);
            provider1.setCountryId(1L);
            provider1.setCreationDate(LocalDate.now());

            Provider provider2 = new Provider();
            provider2.setId(2L);
            provider2.setName("Lavanda2");
            provider2.setDescription("Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.");
            provider2.setPhone("https://www.instagram.com/");
            provider2.setEmail("ejemplo@gmail.com");
            provider2.setFacebook("https://www.instagram.com/");
            provider2.setInstagram("https://www.instagram.com/");
            provider2.setState(State.ACCEPTED);
            provider2.setActive(true);
            provider2.setDeleted(false);
            provider2.setFeedback("");
            provider2.setCategoryId(category1.getId());
            provider2.setUser(user);
            provider2.setProvinceId(1L);
            provider2.setCountryId(1L);
            provider2.setCreationDate(LocalDate.now());

            providerRepository.save(provider1);
            providerRepository.save(provider2);

            Image image = new Image(1L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712840866/wgylkabwrqmrqmt8yhjm.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, null);
            Image image1 = new Image(2L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, provider1.getId(), null, null);
            Image image2 = new Image(3L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, provider2.getId(), null, null);
            imageRepository.save(image);
            imageRepository.save(image1);
            imageRepository.save(image2);


        }
        if (publicationRepository.count() == 0) {
            User user = new User(1L, "gabriel", "nievas", false, Role.ADMIN
                    , "https://lh3.googleusercontent.com/a/ACg8ocJLILFg30029t_SN_ToK6Z2r2KlnLvlj2qyaIZzXCvv=s96-c"
                    , "angelgabrielnievas@gmail.com", null,null,null,null,null);

            Publication publication1 = new Publication();
            publication1.setId(1L);
            publication1.setTitle("¿Qué es el Upcycling?");
            publication1.setDescription("El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.\n" +
                    "\n" +
                    "Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.\n" +
                    "\n" +
                    "El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.\n" +
                    "\n" +
                    "El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.\n" +
                    "\n" +
                    "En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!");
            publication1.setDeleted(false);
            publication1.setCreationDate(LocalDate.now());
            publication1.setNumberOfViews(1L);
            publication1.setUserId(1L);

            Publication publication2 = new Publication();
            publication2.setId(2L);
            publication2.setTitle("¿Qué es el Upcycling?1");
            publication2.setDescription("El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.\n" +
                    "\n" +
                    "Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.\n" +
                    "\n" +
                    "El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.\n" +
                    "\n" +
                    "El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.\n" +
                    "\n" +
                    "En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!");
            publication2.setDeleted(false);
            publication2.setCreationDate(LocalDate.now());
            publication2.setNumberOfViews(1L);
            publication2.setUserId(1L);

            Publication publication3 = new Publication();
            publication3.setId(3L);
            publication3.setTitle("¿Qué es el Upcycling?2");
            publication3.setDescription("El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.\n" +
                    "\n" +
                    "Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.\n" +
                    "\n" +
                    "El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.\n" +
                    "\n" +
                    "El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.\n" +
                    "\n" +
                    "En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!");
            publication3.setDeleted(false);
            publication3.setCreationDate(LocalDate.now());
            publication3.setNumberOfViews(1L);
            publication3.setUserId(1L);

            Publication publication4 = new Publication();
            publication4.setId(4L);
            publication4.setTitle("¿Qué es el Upcycling?3");
            publication4.setDescription("El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.\n" +
                    "\n" +
                    "Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.\n" +
                    "\n" +
                    "El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.\n" +
                    "\n" +
                    "El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.\n" +
                    "\n" +
                    "En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!");
            publication4.setDeleted(false);
            publication4.setCreationDate(LocalDate.now());
            publication4.setNumberOfViews(1L);
            publication4.setUserId(1L);

            Publication publication5 = new Publication();
            publication5.setId(5L);
            publication5.setTitle("¿Qué es el Upcycling?4");
            publication5.setDescription("El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.\n" +
                    "\n" +
                    "Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.\n" +
                    "\n" +
                    "El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.\n" +
                    "\n" +
                    "El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.\n" +
                    "\n" +
                    "En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!");
            publication5.setDeleted(false);
            publication5.setCreationDate(LocalDate.now());
            publication5.setNumberOfViews(1L);
            publication5.setUserId(1L);

            publicationRepository.save(publication1);
            publicationRepository.save(publication2);
            publicationRepository.save(publication3);
            publicationRepository.save(publication4);
            publicationRepository.save(publication5);

            Image image = new Image(4L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication1.getId());
            Image image1 = new Image(5L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712840866/wgylkabwrqmrqmt8yhjm.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication2.getId());
            Image image2 = new Image(6L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712840868/x4sjrepfmqiplhl7ucgt.png"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication2.getId());
            Image image3 = new Image(7L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712840868/x4sjrepfmqiplhl7ucgt.png"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication3.getId());
            Image image4 = new Image(8L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712840866/wgylkabwrqmrqmt8yhjm.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication3.getId());
            Image image5 = new Image(9L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication3.getId());
            Image image6 = new Image(10L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication4.getId());
            Image image7 = new Image(11L, "https://res.cloudinary.com/dmb8sscjm/image/upload/v1712941758/lw8xlngo0nlzirmpkfou.jpg"
                    , "ms2th7lrbmv90dbajcih", "247", "506", null, null, null, publication5.getId());
            imageRepository.save(image);
            imageRepository.save(image1);
            imageRepository.save(image2);
            imageRepository.save(image3);
            imageRepository.save(image4);
            imageRepository.save(image5);
            imageRepository.save(image6);
            imageRepository.save(image7);
        }


    }
}
