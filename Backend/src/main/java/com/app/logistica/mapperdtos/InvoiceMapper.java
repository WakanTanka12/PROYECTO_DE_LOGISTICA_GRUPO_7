package com.app.logistica.mapperdtos;

import com.app.logistica.dtos.CustomerDTO;
import com.app.logistica.dtos.InvoiceDTO;
import com.app.logistica.entities.Customer;
import com.app.logistica.entities.Invoice;

public class InvoiceMapper {
    public static InvoiceDTO mapInvoiceToInvoiceDTO(Invoice invoice) {
        InvoiceDTO invoiceDTO = new InvoiceDTO();
        invoiceDTO.setId(invoice.getId());
        invoiceDTO.setInvoiceCode(invoice.getInvoiceCode());
        invoiceDTO.setDescription(invoice.getDescription());
        invoiceDTO.setOrderId(invoice.getOrder().getId());
        return invoiceDTO;
    }

    public static Invoice mapInvoiceDTOToInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();
        invoice.setId(invoiceDTO.getId());
        invoice.setInvoiceCode(invoiceDTO.getInvoiceCode());
        invoice.setDescription(invoiceDTO.getDescription());
        return invoice;
    }
}
