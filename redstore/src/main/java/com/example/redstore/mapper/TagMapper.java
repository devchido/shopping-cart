package com.example.redstore.mapper;

import com.example.redstore.domain.Tag;
import com.example.redstore.dto.TagDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class TagMapper implements EntityMapper<TagDto, Tag> {
    @Override
    public TagDto toDo(Tag tag) {
        return null;
    }

    @Override
    public Tag toEntity(TagDto tagDto) {
        return null;
    }

    @Override
    public List<TagDto> toDo(List<Tag> e) {
        return null;
    }

    @Override
    public List<Tag> toEntity(List<TagDto> d) {
        return null;
    }
}
