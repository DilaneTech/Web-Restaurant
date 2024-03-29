package com.project.jee.service.impl;

import com.project.jee.service.MenuService;
import com.project.jee.domain.Menu;
import com.project.jee.repository.MenuRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Menu}.
 */
@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    private final Logger log = LoggerFactory.getLogger(MenuServiceImpl.class);

    private final MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    /**
     * Save a menu.
     *
     * @param menu the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Menu save(Menu menu) {
        log.debug("Request to save Menu : {}", menu);
        return menuRepository.save(menu);
    }

    /**
     * Get all the menus.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Menu> findAll() {
        log.debug("Request to get all Menus");
        return menuRepository.findAll();
    }


    /**
     * Get one menu by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Menu> findOne(Long id) {
        log.debug("Request to get Menu : {}", id);
        return menuRepository.findById(id);
    }

    /**
     * Delete the menu by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Menu : {}", id);
        menuRepository.deleteById(id);
    }
}
