package com.app.logistica.services;

import com.app.logistica.dtos.InvoiceDTO;
import com.app.logistica.entities.Invoice;
import org.springframework.stereotype.Service;

import java.util.List;

public interface InvoiceService {
    InvoiceDTO createInvoice(InvoiceDTO invoiceDTO);
    InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO);
    String deleteInvoice(Long id);
    List<InvoiceDTO> getAllInvoices(Long id);
    InvoiceDTO getInvoice(Long id);
    InvoiceDTO getInvoiceByOrderId(Long orderId);
}
