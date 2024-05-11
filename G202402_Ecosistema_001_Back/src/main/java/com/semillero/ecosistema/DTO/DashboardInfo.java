package com.semillero.ecosistema.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardInfo {

    private List<CategoryListInfo> categoryListInfo;

    private Long stateSizeDenied;
    private Long stateSizeAccepted;
    private Long stateSizeReview;
    private Long newProviders;

}
